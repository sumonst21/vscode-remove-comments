import * as vscode from 'vscode';
import { Parser } from './parser';

export function activate(context: vscode.ExtensionContext) {

    let activeEditor: vscode.TextEditor;
    const parser: Parser = new Parser();

    const removeComments = (removeSingleLine: boolean, removeMultiLine: boolean) => {
        if (!activeEditor) {
            vscode.window.showErrorMessage('No active text editor.');
            return;
        }
        const languageId = activeEditor.document.languageId;
        parser.removeComments(activeEditor, languageId, removeSingleLine, removeMultiLine)
            .then(() => {
                vscode.window.showInformationMessage('Comments removed.');
            })
            .catch((error) => {
                vscode.window.showErrorMessage(`Error removing comments: ${error}`);
            });
    };

    const removeAllCommentsCommand = vscode.commands.registerCommand('extension.removeAllComments', () => {
        activeEditor = vscode.window.activeTextEditor!;
        if (activeEditor) {
            removeComments(true, true);
        }
    });

    const removeSingleLineCommentsCommand = vscode.commands.registerCommand('extension.removeSingleLineComments', () => {
        activeEditor = vscode.window.activeTextEditor!;
        if (activeEditor) {
            removeComments(true, false);
        }
    });

    const removeMultilineCommentsCommand = vscode.commands.registerCommand('extension.removeMultilineComments', () => {
        activeEditor = vscode.window.activeTextEditor!;
        if (activeEditor) {
            removeComments(false, true);
        }
    });

    context.subscriptions.push(removeAllCommentsCommand);
    context.subscriptions.push(removeSingleLineCommentsCommand);
    context.subscriptions.push(removeMultilineCommentsCommand);
}

export function deactivate() { }