import pandas as pd

BOUTS_CSV = "../data/liu_invitational_bouts.csv"
MATCHES_CSV = "../data/liu_invitational_matches.csv"

A = "A"
B = "B"
DOUBLE_BYE = "DOUBLE_BYE"


def __main__():
    matches_df = pd.read_csv(MATCHES_CSV)
    bouts_df = pd.read_csv(BOUTS_CSV)
    updated_matches = calculate_match_scores(bouts_df, matches_df)
    updated_matches.to_csv("updated_matches.csv", index=False)


def get_bout_winner(bout):
    if pd.isna(bout["score_a"]) and pd.isna(bout["score_b"]):
        print("getting bye")
        print(bout)
        if is_bye(bout["fencer_a_id"]) and is_bye(bout["fencer_b_id"]):
            return DOUBLE_BYE
        elif is_bye(bout["fencer_a_id"]):
            print(B)
            return B
        elif is_bye(bout["fencer_b_id"]):
            print(B)
            return A
        else:
            if pd.isna(bout["winner"]):
                print(bout)
                raise "Expected winner"
            else:
                if bout["winner"] != "a" and bout["winner"] != "b":
                    print(bout)
                    raise "Expected winner to be 'a' or 'b'"
                return A if bout["winner"] == "a" else B
    else:
        if pd.isna(bout["score_a"]):
            print(bout)
            raise "Expected score_a"
        elif pd.isna(bout["score_b"]):
            print(bout)
            raise "Expected score_b"
        else:
            if bout["score_a"] == bout["score_b"]:
                # TIE
                if bout["score_a"] == 5:
                    raise "Can't tie at 5"
                if bout["winner"] != "a" and bout["winner"] != "b":
                    print(bout)
                    raise "Expected winner to be 'a' or 'b'"
                return A if bout["winner"] == "a" else B
            return A if bout["score_a"] > bout["score_b"] else B


def is_bye(fencer):
    return fencer == "BYE"


def calculate_match_scores(bouts_df, matches_df):
    """
    Calculate scores for each match based on bout results.

    Parameters:
    bouts_df (pd.DataFrame): DataFrame containing bout results
    matches_df (pd.DataFrame): DataFrame containing match information

    Returns:
    pd.DataFrame: Updated matches DataFrame with calculated scores
    """
    # Create a copy of matches_df to avoid modifying the original
    matches = matches_df.copy()

    # Initialize score columns if they don't exist
    score_columns = [
        "overall_a",
        "overall_b",
        "foil_a",
        "foil_b",
        "epee_a",
        "epee_b",
        "saber_a",
        "saber_b",
    ]
    for col in score_columns:
        if col not in matches.columns:
            matches[col] = 0

    # Process each match
    for idx, match in matches.iterrows():
        match_bouts = bouts_df[bouts_df["match_id"] == match["id"]]

        # Calculate scores for each weapon
        for weapon in ["foil", "epee", "saber"]:
            weapon_bouts = match_bouts[match_bouts["weapon"] == weapon]
            # Count wins for team A and B
            team_a_wins = len(
                weapon_bouts[
                    weapon_bouts.apply(lambda bout: get_bout_winner(bout) == A, axis=1)
                ]
            )
            team_b_wins = len(
                weapon_bouts[
                    weapon_bouts.apply(lambda bout: get_bout_winner(bout) == B, axis=1)
                ]
            )
            # Update weapon-specific scores
            matches.at[idx, f"{weapon}_a"] = team_a_wins
            matches.at[idx, f"{weapon}_b"] = team_b_wins

        # Calculate overall scores
        matches.at[idx, "overall_a"] = (
            matches.at[idx, "foil_a"]
            + matches.at[idx, "epee_a"]
            + matches.at[idx, "saber_a"]
        )
        matches.at[idx, "overall_b"] = (
            matches.at[idx, "foil_b"]
            + matches.at[idx, "epee_b"]
            + matches.at[idx, "saber_b"]
        )
    for col in score_columns:
        matches[col] = matches[col].astype(int)

    return matches


__main__()
