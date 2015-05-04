require 'spec_helper'

describe 'cdap::web_app_init' do
  context 'using default cdap version' do
    let(:chef_run) do
      ChefSpec::SoloRunner.new(platform: 'centos', version: 6.6) do
        stub_command('test -e /usr/bin/node').and_return(true)
      end.converge(described_recipe)
    end

    it 'does not run execute[generate-webapp-ssl-cert]' do
      expect(chef_run).not_to run_execute('generate-webapp-ssl-cert')
    end
  end

  context 'with SSL' do
    let(:chef_run) do
      ChefSpec::SoloRunner.new(platform: 'centos', version: 6.6) do |node|
        node.override['cdap']['cdap_site']['ssl.enabled'] = true
        stub_command('test -e /usr/bin/node').and_return(true)
      end.converge(described_recipe)
    end

    it 'does not run execute[generate-webapp-ssl-cert]' do
      expect(chef_run).not_to run_execute('generate-webapp-ssl-cert')
    end
  end

  context 'using cdap <= 2.8.0 with SSL' do
    let(:chef_run) do
      ChefSpec::SoloRunner.new(platform: 'centos', version: 6.6) do |node|
        node.override['cdap']['cdap_site']['ssl.enabled'] = true
        node.override['cdap']['version'] = '2.8.0-1'
        stub_command('test -e /usr/bin/node').and_return(true)
      end.converge(described_recipe)
    end
    it 'executes generate-webapp-ssl-cert' do
      expect(chef_run).to run_execute('generate-webapp-ssl-cert')
    end
  end
end
