import { Position } from "vscode";
import * as vscode from 'vscode';
import { PATTERN } from "./constant";


export function commentText() {
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		let lang = editor.document.languageId;
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
}

export function uncommentText() {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		let lang = editor.document.languageId;
		let commentRgx = PATTERN[lang].with_comment;
		const { start, end } = getLineRange(editor);
		editor.edit((edit) => {
			for (let i = start; i < end; i++) {
				let line = editor.document.lineAt(i);
				let matches = line.text.match(commentRgx);
				if (matches && matches.length > 1) {
					let newText = `${matches[1]}${matches[3]}`;
					edit.replace(line.range, newText);
				}
			}
		});
	}
}

function getLineRange(editor: vscode.TextEditor) {
	const selection = editor.selection;
	let start = 0;
	let end = editor.document.lineCount;

	if (selection.start.character !== selection.end.character || selection.start.line !== selection.end.line) {
		start = selection.start.line;
		end = selection.end.line;
	}
	return {
		start,
		end
	};
}
