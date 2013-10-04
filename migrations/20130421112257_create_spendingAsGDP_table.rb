Sequel.migration do
  up do
     create_table :economy_sizes do
      Float :gdp 
     end
  end

  down do
    drop :economy_sizes 
  end
end
