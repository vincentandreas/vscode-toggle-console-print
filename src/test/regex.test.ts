import * as assert from 'assert';
import * as vscode from 'vscode';
import { PATTERN } from '../util/constant';

suite('Test regex', () => {
    const testCases = [
        {
            language: 'javascript',
            without_comment: [
                "console.log('Hello, world!');",
                "    console.log('Indented');"
            ],
            with_comment: [
                "// console.log('Commented out');",
                "    // console.log('Indented and commented out');"
            ]
        },
        {
            language: 'java',
            without_comment: [
                "System.out.print('Hello, world!');",
                "    System.out.print('Indented');"
            ],
            with_comment: [
                "// System.out.print('Commented out');",
                "    // System.out.print('Indented and commented out');"
            ]
        },
        {
            language: 'go',
            without_comment: [
                "fmt.Print('Hello, world!');",
                "fmt.Sprint('Hello, world!');",
                "    fmt.Print('Indented');"
            ],
            with_comment: [
                "// fmt.Print('Commented out');",
                "// fmt.Sprint('Commented out');",
                "    // fmt.Print('Indented and commented out');"
            ]
        }
    ];

    testCases.forEach(({ language, without_comment, with_comment }) => {
        suite(`Language: ${language}`, () => {
            const pattern = PATTERN[language];

            test('should match uncommented print lines', () => {
                without_comment.forEach(line => {
                    let expected = true;
                    let currPattern = pattern.without_comment;
                    try{
                        assert.equal(currPattern.test(line), expected);
                    }catch(err){
                        console.log(`Pattern : ${currPattern} | Txt : [${line}] | Expected [${expected}]`);
                        throw err;
                    }
                });
            });

            test('should match commented print lines', () => {
                with_comment.forEach(line => {
                    let expected = true;
                    let currPattern = pattern.with_comment;
                    try{
                        assert.equal(currPattern.test(line), expected);
                    }catch(err){
                        console.log(`Pattern : ${currPattern} | Txt : [${line}] | Expected [${expected}]`);
                        throw err;
                    }
                });
            });
        });
    });
});