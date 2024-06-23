import { uncommentMatch } from "../util/helper";

describe('Test helper', () => {
    const testCases = [
        {
            language: 'javascript',
            payload:[
                {
                    with_comment:"//console.log('Commented out');",
                    without_comment:"console.log('Commented out');",        
                },
                {
                    with_comment:"    //    console.log('Indented and commented out');",
                    without_comment:"    console.log('Indented and commented out');",
                }
            ]
        },
        {
            language: "java",
            payload: [
                {
                    with_comment: "// System.out.print('Commented out');",
                    without_comment: "System.out.print('Commented out');"
                },
                {
                    with_comment: "    //     System.out.print('Indented and commented out');",
                    without_comment: "    System.out.print('Indented and commented out');"
                }
            ]
        },
        {
            language: "go",
            payload: [
                {
                    with_comment: "//fmt.Print('Commented out');",
                    without_comment: "fmt.Print('Commented out');"
                },
                {
                    with_comment: "// fmt.Sprint('Commented out');",
                    without_comment: "fmt.Sprint('Commented out');"
                },
                {
                    with_comment: "    // fmt.Print('Indented and commented out');",
                    without_comment: "    fmt.Print('Indented and commented out');"
                }
            ]
        },
        {
            language: "cpp",
            payload: [
                {
                    with_comment: "//cout << \"Commented\";",
                    without_comment: "cout << \"Commented\";"
                },
                {
                    with_comment: "//     cout<< \"Commented\";",
                    without_comment: "cout<< \"Commented\";"
                },
                {
                    with_comment: "       //cout<< \"Commented\";",
                    without_comment: "       cout<< \"Commented\";"
                }
            ]
        },
        {
            language: "shellscript",
            payload: [
                {
                    with_comment: "#echo \"Commented\"",
                    without_comment: "echo \"Commented\""
                },
                {
                    with_comment: "#   echo \"Another comment\"",
                    without_comment: "echo \"Another comment\""
                },
                {
                    with_comment: "   #echo \"Indented comment\"",
                    without_comment: "   echo \"Indented comment\""
                }
            ]
        },
        {
            language: "python",
            payload: [
                {
                    with_comment: "#print(\"Commented\")",
                    without_comment: "print(\"Commented\")"
                },
                {
                    with_comment: "#   print (\"Commented\")",
                    without_comment: "print (\"Commented\")"
                },
                {
                    with_comment: "   #print (\"Commented\")",
                    without_comment: "   print (\"Commented\")"
                }
            ]
        }
    ];

    testCases.forEach(({ language, payload }) => {
        describe(`Language: ${language}`, () => {
            test('should match uncommented', () => {
                payload.forEach(pl => {
                    let processed = uncommentMatch(pl.with_comment,language)                    
                    try{
                        expect(processed).toEqual(pl.without_comment);
                    }catch(err){
                        console.log(`With comment : [${pl.with_comment}] | Processed : [${processed}] | Expected : [${pl.without_comment}]`);
                        throw err;
                    }
                });
            });
        });
    });
});

