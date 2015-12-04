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




copy program_maps from '/var/lib/postgresql/budgetus_tables/program_level_by_county_complete.txt' delimiters ',' csv;
copy maps from '/var/lib/postgresql/budgetus_tables/agencyLevelWithPrograms.txt' delimiters ',' csv;
copy map_correlations from '/var/lib/postgresql/budgetus_tables/allCorrelations.txt' delimiters ',' csv;
copy map_ranges from '/var/lib/postgresql/budgetus_tables/agencyFundingLevels.txt' delimiters ',' csv;
copy programs from '/var/lib/postgresql/budgetus_tables/BudgetUs_Comprehensive.txt' delimiters ',' csv;
copy unique_searches from '/var/lib/postgresql/budgetus_tables/uniqueSearchesAll.txt' delimiters ',' csv;
copy descriptions from '/var/lib/postgresql/budgetus_tables/Subfunction_descriptions.txt' delimiters ',' csv;



--on linode the location is '/var/lib/postgresql/budgetus_tables/<table name>


--scp program_level_by_county_complete.txt root@budgetus.org:/var/lib/postgresql/budgetus_tables/program_level_by_county_complete.txt
--scp agencyLevelWithPrograms.txt root@budgetus.org:/var/lib/postgresql/budgetus_tables/agencyLevelWithPrograms.txt
--scp allCorrelations.txt root@budgetus.org:/var/lib/postgresql/budgetus_tables/allCorrelations.txt
--scp agencyFundingLevels.txt root@budgetus.org:/var/lib/postgresql/budgetus_tables/agencyFundingLevels.txt
--scp BudgetUs_Comprehensive.txt root@budgetus.org:/var/lib/postgresql/budgetus_tables/BudgetUs_Comprehensive.txt
--scp uniqueSearchesAll.txt root@budgetus.org:/var/lib/postgresql/budgetus_tables/uniqueSearchesAll.txt
--scp Subfunction_descriptions.txt root@budgetus.org:/var/lib/postgresql/budgetus_tables/Subfunction_descriptions.txt
--maybe missing agency description here---


--do these commands from the postgres user from psql budgetus command line