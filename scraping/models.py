from dataclasses import dataclass
import datetime


@dataclass
class PartialScores:
    foil: int
    epee: int
    saber: int


@dataclass
class MatchSide:
    university_id: str
    overall: int
    partials: PartialScores


@dataclass
class Match:
    side_A: MatchSide
    side_B: MatchSide
    date: datetime.date
    host: str


@dataclass
class University:
    id: str
    display_name_short: str
    display_name_long: str
    region: str
