delete from map_correlations;
delete from simple_ingredients;
delete from full_ingredients;
delete from bayesian_pairs;
delete from user_selections;
delete from cluster_ingredients;
delete from cooking_methods;

--copy map_correlations from '/Users/raulfoo/Desktop/Recipe_Generator/Files_For_PostGres/recipe_list(ForPostGres_wCommonalityScores).txt' delimiters ',' csv;
--copy map_ranges from '/Users/raulfoo/Desktop/Recipe_Generator/Files_For_PostGres/Base_Probability_Cleaned.txt' delimiters ',' csv;
--copy maps from '/Users/raulfoo/Desktop/Recipe_Generator/Files_For_PostGres/full_ingredients_table_cleaned.txt' delimiters ',' csv;
--copy descriptions from '/Users/raulfoo/Desktop/Recipe_Generator/Files_For_PostGres/bayesian_pairs.txt' delimiters ',' csv;
--copy unique_searches from '/Users/raulfoo/Desktop/Recipe_Generator/Files_For_PostGres/User_Search_Parings.txt' delimiters ',' csv;
--copy subfunction from '/Users/raulfoo/Desktop/Recipe_Generator/recipe_methods/clustering_scores.txt' delimiters ',' csv;




copy program_maps from '/Users/raulfoo/Desktop/Projects/Budget_Map/program_level_by_county_complete.txt' delimiters ',' csv;
copy maps from '/Users/raulfoo/Desktop/Projects/Budget_Map/agencyLevelWithPrograms.txt' delimiters ',' csv;
copy map_correlations from '/Users/raulfoo/Desktop/Projects/Budget_Map/allCorrelations.txt' delimiters ',' csv;
copy map_ranges from '/Users/raulfoo/Desktop/Projects/Budget_Map/agencyFundingLevels.txt' delimiters ',' csv;