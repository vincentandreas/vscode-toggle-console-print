import { Position } from "vscode";
import * as vscode from 'vscode';


export function commentText() {
	let cmdStr = "console.";
	let commentStr = "// ";
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		let docs = editor.document;
		editor.edit((edit) => {
			for (let i = 0; i < docs.lineCount; i++) {
				let line = docs.lineAt(i);
				if (line.text.startsWith(cmdStr)) {
					let pos = new Position(line.lineNumber, 0);
					edit.insert(pos, commentStr);
				}
			}
		});


	}
}

export function uncommentText(){
	let commentRgx = /(^\/\/[ ]*)(console.*$)/;

	const editor = vscode.window.activeTextEditor;
	if (editor) {
		let docs = editor.document;
		editor.edit((edit) => {
			for (let i = 0; i < docs.lineCount; i++) {
				let line = docs.lineAt(i);

				let matches = line.text.match(commentRgx);
				if (matches && matches.length > 1) {
					let range = new vscode.Range(line.range.start, line.range.end);
					edit.replace(range, matches[2]);
				}
			}
		});
	}
}