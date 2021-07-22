# frozen_string_literal: true

require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name            = package['name']
  s.version         = package['version']
  s.homepage        = package['homepage']
  s.summary         = package['description']
  s.license         = package['license']
  s.author          = { package['author']['name'] => package['author']['email'] }
  s.platform        = :ios, '9.0'
  s.source          = { git: 'https://github.com/TheWirv/react-native-wallet-passes.git',
                        tag: "v#{s.version}" }
  s.source_files    = 'ios/RNWalletPasses/*.{h,m}'
  s.preserve_paths  = '**/*.{tsx,ts,js}'

  s.dependency 'React-Core'
end
