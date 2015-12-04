#!/usr/bin/env ruby

require "bundler/setup"
require "pathological"
require "environment"

command = "sequel -m migrations/ #{"-M #{ARGV[0]}" if ARGV[0]}"
db_url = "postgres://#{DB_USER}:#{DB_PASS}@#{DB_HOST}/#{DB_NAME}"
puts `#{command} #{db_url}`
