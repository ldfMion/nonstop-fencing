import pandas as pd

results_df = pd.read_csv("../data/osu-duals-results.csv")
print(results_df)

bouts_df = results_df[results_df["Fencer A"].notna() | results_df["Fencer B"].notna()]
bouts_df.drop("Fencer A", axis=1, inplace=True)
bouts_df.drop("Fencer B", axis=1, inplace=True)
bouts_df["Gender"] = bouts_df["Gender"].lower()
bouts_df.rename(columns={"Fencer A ID": "fencer_a_id"}, inplace=True)
bouts_df.rename(columns={"Fencer B ID": "fencer_b_id"}, inplace=True)

print(bouts_df)
# bouts_df.to_csv("../data/osu-duals-bouts.csv", index=True)

non_bout_rows = results_df[
    (results_df["Fencer A"].isna() & results_df["Fencer B"].isna())
    & results_df["Score A"].notna()
][["Team A", "Team B", "Score A", "Score B", "Gender", "Weapon"]]
print(non_bout_rows)

matches_df = pd.DataFrame(
    columns=[
        "university_a_id",
        "university_b_id",
        "gender",
        "event",
    ]
)

for i in range(0, len(non_bout_rows), 4):
    chunk = non_bout_rows.iloc[i : i + 4]
    # Process the chunk
    print(chunk)
    matches_df.loc[len(matches_df.index)] = {
        "university_a_id": chunk.iloc[0]["Team A"],
        "university_b_id": chunk.iloc[0]["Team B"],
        "gender": chunk.iloc[3]["Gender"],
        "event": 1,
        "overall_score_a": chunk.iloc[3]["Score A"],
        "overall_score_b": chunk.iloc[3]["Score B"],
        "foil_score_a": chunk.iloc[0]["Score A"],
        "foi_score_b": chunk.iloc[0]["Score B"],
        "epee_score_a": chunk.iloc[1]["Score A"],
        "epee_score_b": chunk.iloc[1]["Score B"],
        "saber_score_a": chunk.iloc[2]["Score A"],
        "saber_score_b": chunk.iloc[2]["Score B"],
    }

print(matches_df)
# matches_df.to_csv("../data/osu-duals-matches.csv", index=True)
