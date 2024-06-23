import { PATTERN } from "../util/constant";

describe('Test regex', () => {
    const testCases = [
        {
            language: 'javascript',
            without_comment: [
                "console.log('Hello, world!');",
                "    console.log('Indented');",
                "	console.log('Using tab');"
            ],
            with_comment: [
                "//console.log('Commented out');",
                "    // console.log('Indented and commented out');",
                "		//			console.log('Using tab and commented out');"
            ],
            shouldnt_match:[
                `let str = console.log("asdfsdf")`            
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
                "    //System.out.print('Indented and commented out');"
            ],
            shouldnt_match:[
                `if(System.out.print('asdfsadf'))`
            ]
        },
        {
            language: 'go',
            without_comment: [
                "fmt.Print('Hello, world!');",
                "fmt.Sprint('Hello, world!');",
                "    fmt.Print('Indented');",
                `	fmt.Printf("[Using Tab] Package  %q\n", pkg.Path())`
            ],
            with_comment: [
                "//fmt.Print('Commented out');",
                "// fmt.Sprint('Commented out');",
                "    // fmt.Print('Indented and commented out');"
            ],
            shouldnt_match:[
                `fmt .Println('test')`
            ]
        },
        {
            language: 'cpp',
            without_comment:[
                `cout << "Commented";`,
                `cout<< "Commented";`,
                `       cout<< "Commented";`
            ],
            with_comment: [
                `//cout << "Commented";`,
                `//     cout<< "Commented";`,
                `       //cout<< "Commented";`
            ],
            shouldnt_match:[
                `int cout1 = 12`
            ]
        },
        {
            language: 'shellscript',
            without_comment: [
                `echo "Commented"`,
                `echo "Another comment"`,
                `   echo "Indented comment"`
            ],
            with_comment: [
                `#echo "Commented"`,
                `#   echo "Another comment"`,
                `   #echo "Indented comment"`
            ],
            shouldnt_match: [
                `echoVariable="Not a print statement"`
            ]
        },
        {
            language: 'python',
            without_comment: [
                `print("Commented")`,
                `print ("Commented")`,
                `   print ("Commented")`
            ],
            with_comment: [
                `#print("Commented")`,
                `#   print ("Commented")`,
                `   #print ("Commented")`
            ],
            shouldnt_match: [
                `print1 = 12`
            ]
        }
    ];

    testCases.forEach(({ language, without_comment, with_comment,shouldnt_match }) => {
        describe(`Language: ${language}`, () => {
            const pattern = PATTERN[language];

            test('should match uncommented print lines', () => {
                without_comment.forEach(line => {
                    let expected = true;
                    let currPattern = pattern.without_comment;
                    try{
                        expect(currPattern.test(line)).toEqual(expected);
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
                        expect(currPattern.test(line)).toEqual(expected);
                    }catch(err){
                        console.log(`Pattern : ${currPattern} | Txt : [${line}] | Expected [${expected}]`);
                        throw err;
                    }
                });
            });

            test('Should not match invalid lines', () =>{
                shouldnt_match.forEach(line => {
                    let expected = false;
                    let currPattern = pattern.without_comment;
                    try{
                        expect(currPattern.test(line)).toEqual(expected);
                    }catch(err){
                        console.log(`Pattern : ${currPattern} | Txt : [${line}] | Expected [${expected}]`);
                        throw err;
                    }
                });
            })
        });
    });
});