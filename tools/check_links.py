#!/usr/bin/env python3
"""Check internal website links locally or against a deployed base URL."""

import argparse
import sys
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(errors="replace")

PAGES = (
    "index.html",
    "destinations.html",
    "food.html",
    "culture.html",
    "tips.html",
    "about.html",
)
REQUIRED_FILES = ("README.md", "CHANGELOG.md", ".gitignore", "docs/REPORT.md")
EXTERNAL_PREFIXES = ("http://", "https://", "mailto:", "tel:", "data:", "javascript:", "//")


class ReferenceParser(HTMLParser):
    """Collect local href/src references and in-page anchor identifiers."""

    def __init__(self):
        super().__init__()
        self.references = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if attributes.get("id"):
            self.ids.add(attributes["id"])
        if tag == "a" and attributes.get("name"):
            self.ids.add(attributes["name"])
        if tag in ("a", "link") and attributes.get("href"):
            self.references.append((tag, "href", attributes["href"]))
        if tag in ("script", "img", "source", "video", "audio") and attributes.get("src"):
            self.references.append((tag, "src", attributes["src"]))


def parse_html(text):
    parser = ReferenceParser()
    parser.feed(text)
    return parser


def is_external(url):
    return url.startswith(EXTERNAL_PREFIXES)


def local_target(root, page, reference):
    path_part = reference.partition("#")[0].split("?", 1)[0]
    decoded_path = urllib.parse.unquote(path_part)
    relative_path = Path(page).parent / (decoded_path or Path(page).name)
    parts = []
    for part in relative_path.parts:
        if part in ("", "."):
            continue
        if part == "..":
            if not parts:
                return None, None
            parts.pop()
        else:
            parts.append(part)
    relative_target = Path(*parts).as_posix()
    target = root.joinpath(*parts).resolve()
    try:
        target.relative_to(root)
    except ValueError:
        return None, None
    return target, relative_target


def exists_with_exact_case(root, relative_path):
    current = root
    for part in Path(relative_path).parts:
        if part in ("", "."):
            continue
        if not current.is_dir():
            return False
        try:
            names = {entry.name for entry in current.iterdir()}
        except OSError:
            return False
        if part not in names:
            return False
        current = current / part
    return current.exists()


def check_local(root):
    root = root.resolve()
    errors = []
    warnings = []
    parsed_pages = {}

    for page in PAGES:
        page_file = root / page
        if not page_file.is_file():
            errors.append("Missing page: " + page)
            continue
        source = page_file.read_text(encoding="utf-8")
        if not source.strip():
            errors.append("Page has no content: " + page)
        parsed_pages[page] = parse_html(source)

    for relative in REQUIRED_FILES:
        if not (root / relative).is_file():
            errors.append("Missing required file: " + relative)
    if not (root / "docs" / "images").is_dir():
        warnings.append("Missing docs/images/ evidence directory")

    total = 0
    for page, parsed in parsed_pages.items():
        linked_pages = set()
        for _tag, attribute, reference in parsed.references:
            if is_external(reference):
                continue
            total += 1
            target, relative_target = local_target(root, page, reference)
            if target is None:
                errors.append(page + ': ' + attribute + '="' + reference + '" points outside the project root')
                continue
            if not exists_with_exact_case(root, relative_target):
                errors.append(page + ': ' + attribute + '="' + reference + '" points to a missing or mis-cased path')
                continue
            if relative_target in PAGES:
                linked_pages.add(relative_target)

            fragment = reference.partition("#")[2]
            if fragment and target.is_file() and target.suffix.lower() in (".html", ".htm"):
                destination = parsed_pages.get(relative_target)
                if destination and urllib.parse.unquote(fragment) not in destination.ids:
                    errors.append(page + ': missing #' + fragment + ' in ' + relative_target)

        missing = [target for target in PAGES if target != page and target not in linked_pages]
        if missing:
            errors.append(page + ": missing navigation links to " + ", ".join(missing))

    print("Checked {}/{} pages and {} internal references.".format(len(parsed_pages), len(PAGES), total))
    return errors, warnings


def fetch(url, timeout=20):
    request = urllib.request.Request(url, headers={"User-Agent": "VietNamExplore-linkcheck/1.0"})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return response.status, response.read().decode("utf-8", errors="replace")


def check_remote(base):
    errors = []
    warnings = []
    parsed_base = urllib.parse.urlsplit(base)
    if parsed_base.scheme not in ("http", "https") or not parsed_base.netloc:
        return ["--base must be an absolute http:// or https:// URL"], warnings

    if not base.endswith("/"):
        base += "/"
    page_urls = {urllib.parse.urljoin(base, page) for page in PAGES}
    seen = set()

    for page in PAGES:
        page_url = urllib.parse.urljoin(base, page)
        try:
            status, body = fetch(page_url)
        except urllib.error.HTTPError as error:
            errors.append("{} -> HTTP {}".format(page_url, error.code))
            continue
        except (urllib.error.URLError, TimeoutError, OSError) as error:
            errors.append("{} -> {}".format(page_url, error))
            continue

        print("HTTP {}  {}".format(status, page_url))
        for _tag, _attribute, reference in parse_html(body).references:
            if is_external(reference) or reference.startswith("#"):
                continue
            target_url = urllib.parse.urldefrag(urllib.parse.urljoin(page_url, reference))[0]
            if target_url in page_urls or target_url in seen:
                continue
            seen.add(target_url)
            try:
                status, _body = fetch(target_url)
                print("HTTP {}  {}".format(status, target_url))
            except urllib.error.HTTPError as error:
                errors.append("{}: {} -> HTTP {}".format(page, target_url, error.code))
            except (urllib.error.URLError, TimeoutError, OSError) as error:
                errors.append("{}: {} -> {}".format(page, target_url, error))

    return errors, warnings


def main():
    parser = argparse.ArgumentParser(description="Check VietNamExplore page and asset links")
    parser.add_argument("--base", help="GitHub Pages base URL for checking the deployed website")
    parser.add_argument(
        "--root",
        default=str(Path(__file__).resolve().parent.parent),
        help="Project root directory (defaults to the parent of tools/)",
    )
    args = parser.parse_args()

    if args.base:
        errors, warnings = check_remote(args.base)
    else:
        errors, warnings = check_local(Path(args.root))

    for warning in warnings:
        print("WARNING:", warning)
    for error in errors:
        print("ERROR:", error)
    print("RESULT:", "PASS" if not errors else "FAIL ({} errors)".format(len(errors)))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
