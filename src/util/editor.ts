import { Position } from "vscode";
import * as vscode from 'vscode';


export function commentText() {
	let commentRgx = /([ ]*)(console.*$)/;
	let commentStr = "// ";
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		let docs = editor.document;
		editor.edit((edit) => {
			for (let i = 0; i < docs.lineCount; i++) {
				let line = docs.lineAt(i);
				let matches = line.text.match(commentRgx);
				if (matches && matches.length>1) {
					let pos = new Position(line.lineNumber, matches[1].length);
					edit.insert(pos, commentStr);
				}
			}
		});


	}
}

export function uncommentText(){
	let commentRgx = /([ ]*)(\/\/[ ]*)(console.*$)/;

	const editor = vscode.window.activeTextEditor;
	if (editor) {
		let docs = editor.document;
		editor.edit((edit) => {
			for (let i = 0; i < docs.lineCount; i++) {
				let line = docs.lineAt(i);
				let matches = line.text.match(commentRgx);
				if (matches && matches.length > 1) {
					let range = new vscode.Range(line.range.start, line.range.end);
					let newText = `${matches[1]}${matches[3]}`;
					edit.replace(range, newText);
				}
			}
		});
	}
}