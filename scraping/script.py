from functions import load_universities, parse_matches_from_html
from functions import create_csv_from_matches

MEN_HTML = "Results Men - USFCA.html"
MEN_HTML_DIV3 = "Results Men D3 - USFCA.html"

WOMEN_HTML = "Results Women - USFCA.html"
WOMEN_HTML_DIV3 = "Results Women D3 - USFCA.html"

MEN_FILENAME = "../data/team-results-men"
WOMEN_FILENAME = "../data/team-results-women"

UNIVERSITIES_FILENAME = "../data/universities.csv"

universities = load_universities(UNIVERSITIES_FILENAME)

men_matches = parse_matches_from_html(MEN_HTML, universities) + parse_matches_from_html(
    MEN_HTML_DIV3, universities
)
create_csv_from_matches(men_matches, MEN_FILENAME)

women_matches = parse_matches_from_html(
    WOMEN_HTML, universities
) + parse_matches_from_html(WOMEN_HTML_DIV3, universities)
create_csv_from_matches(women_matches, WOMEN_FILENAME)
