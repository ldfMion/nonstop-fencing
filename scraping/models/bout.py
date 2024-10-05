from dataclasses import dataclass


@dataclass
class Bout:
    eventId: str
    fencer_a_id: str
    fencer_b_id: str
    fencer_a_score: int
    fencer_b_score: int
    winner_id: str
