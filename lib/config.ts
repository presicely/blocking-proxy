#!/usr/bin/env node

import * as minimist from 'minimist';

export interface Config {
  help?: boolean;
  fork?: boolean;
  seleniumAddress?: string;
  port?: number;
  rootElement?: string;
}

const opts: minimist.Opts = {
  boolean: ['help', 'fork'],
  string: ['port', 'seleniumAddress'],
  alias: {
    help: ['h'],
    port: ['p'],
    seleniumAddress: ['s'],
  },
  default: {
    port: process.env.BP_PORT || 0,
    seleniumAddress: process.env.BP_SELENIUM_ADDRESS || 'http://localhost:4444/wd/hub',
    rootElement: 'body'
  }
};

export function processArgs(argv: string[]) {
  return minimist(argv, opts) as Config;
}

export function printHelp() {
  console.log(`
Usage: blocking-proxy <options>

Options:
    --help, -h              Show help.
    --port, -p              The port to listen on. If unset, will choose a random free port.
    --fork                  Start in fork mode. BlockingProxy will use process.send() to communicate
                                with the parent process.
    --selenumAddress, -s    The address of the selenium remote server to proxy.
    --rootElement           Element housing ng-app, if not html or body.
`);
}