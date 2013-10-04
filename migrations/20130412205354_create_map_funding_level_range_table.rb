Sequel.migration do
  up do
    create_table :map_ranges do
      String :agency_id
      String :agency
      Float :min_level
      Float :max_level 
      Float :total
      Float :total_per_cap
      Float :thresholds
      
     
      
      index :agency_id
    end
  end

  down do
    drop_table :map_ranges
  end
end
