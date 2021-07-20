require 'json'

Pod::Spec.new do |s|
  # NPM package specification
  package = JSON.parse(File.read(File.join(File.dirname(__FILE__), 'package.json')))

  s.name            = package['name']
  s.version         = package['version']
  s.homepage        = package['homepage']
  s.summary         = package['description']
  s.license         = package['license']
  s.author          = { package['author']['name'] => package['author']['email'] }
  s.platform        = :ios, '9.0'
  s.source          = { git: 'https://github.com/TheWirv/react-native-walletpass.git',
                        tag: "v#{s.version}" }
  s.source_files    = 'ios/RNWalletPass/*.{h,m}'
  s.preserve_paths  = '**/*.{tsx,ts,js}'

  s.dependency 'React-Core'
end
