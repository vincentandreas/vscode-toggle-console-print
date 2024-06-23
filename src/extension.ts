import * as vscode from 'vscode';
import { commentText, uncommentText } from './backend/editor';

export function activate(context: vscode.ExtensionContext) {
	const disposComment = vscode.commands.registerCommand('toggle-console-print.comment', () => {
		commentText();
	});
	const disposUncomment = vscode.commands.registerCommand('toggle-console-print.uncomment', () => {
		uncommentText();
	});
	context.subscriptions.push(disposComment);
	context.subscriptions.push(disposUncomment);
}

export function deactivate() {}
