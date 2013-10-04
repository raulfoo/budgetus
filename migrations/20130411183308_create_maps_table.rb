Sequel.migration do
  up do
    create_table :maps do
      #String :program_id
      String :agency_id
      #String :program
      String :agency
      String :location_name
      String :location_id
      Float :expenditure
      Float :per_capita_expend
      String :rank
      String :program_portions
      
      index :agency_id
      index :location_id
    end
  end

  down do
    drop_table :maps
  end
end
