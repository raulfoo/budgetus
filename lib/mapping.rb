require "json"

class BudgetUs < Sinatra::Base

  get "/change_map" do
  
    map_select = Map.select(:per_capita_expend, :agency, :location_name, :location_id, :rank, :program_portions).where(:agency_id => params[:id]).all 
    
    map_select.map! {|e| e.values}
    
    ranges = MapRange.filter(:agency_id => params[:id].to_s).all
    rangeMin = ranges[0][:min_level]
    rangeMax = ranges[0][:max_level]
    totalSpending = ranges[0][:total]
    totalPerCap = ranges[0][:total_per_cap]
    
    thresholds = Array.new()
    ranges.each do |thresh| 
      thresholds.push thresh[:thresholds]
    end
    
    
    map_cors = MapCorrelation.filter(:agency_id => params[:id].to_s).sort_by(&:correlation).reverse
    
    correlation_array = Array.new() 
    map_cors.each do |temp_cor|
      correlation_array.push({:metric => temp_cor[:metric], :correlation => temp_cor[:correlation]})
    end
    
    

    
    output = {:map_values => map_select, :range_min => rangeMin, :range_max => rangeMax, :totalSpend => totalSpending, :totalPerCap => totalPerCap, :thresholds => thresholds, :correlation_array => correlation_array}
    return output.to_json
  
  end

end