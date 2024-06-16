import * as vscode from 'vscode';
import { commentText, uncommentText } from './util/editor';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "toggle-console-print" is now active!');

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
