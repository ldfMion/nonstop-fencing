from functions import parse_matches_from_html
from functions import create_csv_from_matches

MEN_HTML = "Results Men - USFCA.html"
MEN_HTML_DIV3 = "Results Men D3 - USFCA.html"

WOMEN_HTML = "Results Women - USFCA.html"
WOMEN_HTML_DIV3 = "Results Women D3 - USFCA.html"

MEN_FILENAME = "Team Results Men 23-24"
WOMEN_FILENAME = "Team Results Women 23-24"

men_matches = parse_matches_from_html(MEN_HTML) + parse_matches_from_html(MEN_HTML_DIV3)
create_csv_from_matches(men_matches, MEN_FILENAME)

women_matches = parse_matches_from_html(WOMEN_HTML) + parse_matches_from_html(
    WOMEN_HTML_DIV3
)
create_csv_from_matches(women_matches, WOMEN_FILENAME)
