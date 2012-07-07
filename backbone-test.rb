require 'rubygems'
require 'sinatra'
require 'json'

states = ["full", "hungry", "starving"]
collection = [{ "id"  => "julian",
                "state" => "hungry"}, 
              { "id"  => "danny",
                "state" => "starving"},
              { "id"  => "alan",
                "state" => "full"}]

num_attempts = 0

get '/' do
    File.open('index.html')
end
get '/collection' do
    content_type :json
    collection.each { |ele| ele['state'] = states[rand(3)] }
    if num_attempts > 1
        collection.push( { "id"  => (0...5).map{97.+(rand(25)).chr}.join.capitalize,
                           "state" => states[rand(3)] })
    end
    num_attempts += 1
    collection.to_json
end
