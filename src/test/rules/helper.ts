/// <reference path='../../../typings/chai/chai.d.ts' />
import {expect} from 'chai';
import * as ts from "tslint/node_modules/typescript";
import * as Lint from "tslint/lib/lint";

export function testScript(rule: string, scriptText: string) : boolean {
  const config = {
    rules: {
      [rule]: true
    }
  };

  const options: Lint.ILinterOptions = {
    formatter: 'json',
    configuration: config,
    rulesDirectory: 'dist/rules/',
    formattersDirectory: 'dist/formatters/'
  };

  const linter = new Lint.Linter(`${rule}.ts`, scriptText, options);
  const result = linter.lint();
  
  const failures = JSON.parse(result.output);
  
  return failures.length === 0;
}

export function makeTest(rule: string, scripts: Array<string>, expected: boolean) {
  scripts.forEach(code => {
    const res = testScript(rule, code);
    expect(res).to.equal(expected, code);
  });
}
