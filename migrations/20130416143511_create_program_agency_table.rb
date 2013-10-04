Sequel.migration do
  up do
    create_table :program_maps do
      Integer :county_id
      String :agency_id
      String :program_name
      Float :percent_share
     
      index :county_id
      index :agency_id
    end
  end

  down do
    drop_table :program_maps
  end
end
