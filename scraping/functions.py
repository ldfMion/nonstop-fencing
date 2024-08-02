from bs4 import BeautifulSoup, ResultSet
import pandas as pd
from models import Match, MatchSide, PartialScores
import datetime

TEAM_A_NAME_IDX = 0
TEAM_A_SCORE_IDX = 2
TEAM_B_SCORE_IDX = 3
TEAM_B_NAME_IDX = 5
DATE_IDX = 6
HOST_IDX = 7

COLUMN_NAMES = [
    "Team A",
    "Team A Overall",
    "Team A Foil",
    "Team A Epee",
    "Team A Saber",
    "Team B",
    "Team B Overall",
    "Team B Foil",
    "Team B Epee",
    "Team B Saber",
    "Date",
    "Host",
]

REPLACE_MISSING = "Wagner"


def parse_partial_scores(partial: str) -> PartialScores:
    score_list = partial.split("/")
    saber = int(score_list[0])
    foil = int(score_list[1])
    epee = int(score_list[2])
    return PartialScores(foil, epee, saber)


def get_side_from_row(cols, name_idx, score_idx) -> MatchSide:
    name = cols[name_idx].get_text()
    if name == "":
        name = REPLACE_MISSING
    score = cols[score_idx]
    overall_score = score.contents[0].get_text()
    partial_scores_str = score.contents[2].get_text()
    partials = parse_partial_scores(partial_scores_str)
    return MatchSide(name, overall_score, partials)


def get_date_from_row(cols) -> datetime:
    raw = cols[DATE_IDX].get_text()
    date = datetime.date.fromisoformat(raw)
    return date


def get_host_from_row(cols) -> str:
    return cols[HOST_IDX].get_text()


def convert_row_to_match(row) -> Match:
    columns = row.find_all("td")  # .get_text()
    side_A = get_side_from_row(columns, TEAM_A_NAME_IDX, TEAM_A_SCORE_IDX)
    side_B = get_side_from_row(columns, TEAM_B_NAME_IDX, TEAM_B_SCORE_IDX)
    date = get_date_from_row(columns)
    host = get_host_from_row(columns)
    return Match(side_A=side_A, side_B=side_B, date=date, host=host)


def convert_side_to_row(side: MatchSide) -> list:
    return [
        side.name,
        side.overall,
        side.partials.foil,
        side.partials.epee,
        side.partials.saber,
    ]


def convert_match_to_row(match: Match) -> list:
    return (
        convert_side_to_row(match.side_A)
        + convert_side_to_row(match.side_B)
        + [match.date.isoformat(), match.host]
    )


def parse_matches_from_html(html_file_name):
    # Load the HTML file
    with open(html_file_name, "r", encoding="utf-8") as file:
        html_content = file.read()
    # Parse the HTML code using BeautifulSoup
    soup = BeautifulSoup(html_content, "html.parser")
    matches = []
    for row in soup.select("tr")[1:]:
        match = convert_row_to_match(row)
        matches.append(match)
    return matches


def create_csv_from_matches(matches, created_csv_name):
    rows = map(convert_match_to_row, matches)
    df = pd.DataFrame(rows, columns=COLUMN_NAMES)
    print(df.head())
    df.to_csv(f"{created_csv_name}.csv", index=False)
