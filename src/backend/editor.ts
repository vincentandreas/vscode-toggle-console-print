import { Position } from "vscode";
import * as vscode from 'vscode';
import { PATTERN } from "../util/constant";
import { uncommentMatch } from "../util/helper";


export function commentText() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	let lang = editor.document.languageId;
	if(!PATTERN[lang]){
		vscode.window.showInformationMessage(`File extension language unknown, can't comment file`);
		 return;
	}
	let commentRgx = PATTERN[lang].without_comment;
	let commentStr = "// ";
	const { start, end } = getLineRange(editor);
	editor.edit((edit) => {
		for (let i = start; i < end; i++) {
			let line = editor.document.lineAt(i);
			let matches = line.text.match(commentRgx);
			if (matches && matches.length > 1) {
				let pos = new Position(line.lineNumber, matches[1].length);
				edit.insert(pos, commentStr);
			}
		}
	});
}

export function uncommentText() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	let lang = editor.document.languageId;
	if(!PATTERN[lang]){
		vscode.window.showInformationMessage(`File extension language unknown, can't uncomment file`);
		 return;
	}
	const { start, end } = getLineRange(editor);
	editor.edit((edit) => {
		for (let i = start; i < end; i++) {
			let line = editor.document.lineAt(i);
			let newText = uncommentMatch(line.text, lang);
			if(newText){
				edit.replace(line.range, newText);
			}
		}
	});
}



function getLineRange(editor: vscode.TextEditor) {
	const selection = editor.selection;
	let start = 0;
	let end = editor.document.lineCount;

	if (selection.start.character !== selection.end.character || selection.start.line !== selection.end.line) {
		start = selection.start.line;
		end = selection.end.line + 1;
	}
	return {
		start,
		end
	};
}
