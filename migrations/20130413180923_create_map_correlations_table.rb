Sequel.migration do
  up do
    create_table :map_correlations do
      String :metric
      String :agency_id
      String :agency
      Float :correlation 
     
      index :agency_id
    end
  end

  down do
    drop_table :map_correlations
  end
end
