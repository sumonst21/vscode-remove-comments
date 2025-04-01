import * as vscode from 'vscode';

// Refactor the Parser class into a separate file (parser.ts)
export class Parser {
    private singleLineDelimiters: { [language: string]: string } = {};
    private multiLineDelimiters: { [language: string]: { start: string; end: string } } = {};
    private supportedLanguages: string[] = [];

    constructor() {
        this.initializeDelimiters();
    }

    private initializeDelimiters() {
        // Single-line comment delimiters
        this.singleLineDelimiters['al'] = '//';
        this.singleLineDelimiters['c'] = '//';
        this.singleLineDelimiters['cpp'] = '//';
        this.singleLineDelimiters['csharp'] = '//';
        this.singleLineDelimiters['css'] = '//';
        this.singleLineDelimiters['dart'] = '//';
        this.singleLineDelimiters['fsharp'] = '//';
        this.singleLineDelimiters['go'] = '//';
        this.singleLineDelimiters['haxe'] = '//';
        this.singleLineDelimiters['java'] = '//';
        this.singleLineDelimiters['javascript'] = '//';
        this.singleLineDelimiters['javascriptreact'] = '//';
        this.singleLineDelimiters['jsonc'] = '//';
        this.singleLineDelimiters['kotlin'] = '//';
        this.singleLineDelimiters['less'] = '//';
        this.singleLineDelimiters['pascal'] = '//';
        this.singleLineDelimiters['objectpascal'] = '//';
        this.singleLineDelimiters['php'] = '//';
        this.singleLineDelimiters['rust'] = '//';
        this.singleLineDelimiters['scala'] = '//';
        this.singleLineDelimiters['swift'] = '//';
        this.singleLineDelimiters['typescript'] = '//';
        this.singleLineDelimiters['typescriptreact'] = '//';
        this.singleLineDelimiters['coffeescript'] = '#';
        this.singleLineDelimiters['dockerfile'] = '#';
        this.singleLineDelimiters['elixir'] = '#';
        this.singleLineDelimiters['graphql'] = '#';
        this.singleLineDelimiters['julia'] = '#';
        this.singleLineDelimiters['makefile'] = '#';
        this.singleLineDelimiters['perl'] = '#';
        this.singleLineDelimiters['perl6'] = '#';
        this.singleLineDelimiters['powershell'] = '#';
        this.singleLineDelimiters['python'] = '#';
        this.singleLineDelimiters['r'] = '#';
        this.singleLineDelimiters['ruby'] = '#';
        this.singleLineDelimiters['shellscript'] = '#';
        this.singleLineDelimiters['yaml'] = '#';
        this.singleLineDelimiters['ada'] = '--';
        this.singleLineDelimiters['haskell'] = '--';
        this.singleLineDelimiters['plsql'] = '--';
        this.singleLineDelimiters['sql'] = '--';
        this.singleLineDelimiters['lua'] = '--';
        this.singleLineDelimiters['vb'] = "'";
        this.singleLineDelimiters['erlang'] = '%';
        this.singleLineDelimiters['latex'] = '%';
        this.singleLineDelimiters['clojure'] = ';';
        this.singleLineDelimiters['racket'] = ';';
        this.singleLineDelimiters['lisp'] = ';';
        this.singleLineDelimiters['terraform'] = '#';
        this.singleLineDelimiters['fortran'] = '!';

        // Multi-line comment delimiters
        this.multiLineDelimiters['c'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['cpp'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['csharp'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['css'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['dart'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['go'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['haxe'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['java'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['javascript'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['javascriptreact'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['kotlin'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['less'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['objectpascal'] = { start: '(*', end: '*)' };
        this.multiLineDelimiters['pascal'] = { start: '(*', end: '*)' };
        this.multiLineDelimiters['php'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['rust'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['scala'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['swift'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['typescript'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['typescriptreact'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['html'] = { start: '<!--', end: '-->' };
        this.multiLineDelimiters['xml'] = { start: '<!--', end: '-->' };
        this.multiLineDelimiters['graphql'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['julia'] = { start: '#=', end: '= #' };
        this.multiLineDelimiters['makefile'] = { start: '#', end: '#' };
        this.multiLineDelimiters['perl'] = { start: '=begin', end: '=cut' };
        this.multiLineDelimiters['powershell'] = { start: '<#', end: '#>' };
        this.multiLineDelimiters['python'] = { start: "'''", end: "'''" };
        this.multiLineDelimiters['r'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['ruby'] = { start: '=begin', end: '=end' };
        this.multiLineDelimiters['shellscript'] = { start: ':', end: ':' };
        this.multiLineDelimiters['yaml'] = { start: '#', end: '#' };
        this.multiLineDelimiters['ada'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['haskell'] = { start: '{-', end: '-}' };
        this.multiLineDelimiters['plsql'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['sql'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['erlang'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['latex'] = { start: '\\begin{comment}', end: '\\end{comment}' };
        this.multiLineDelimiters['clojure'] = { start: '#_', end: '_#' };
        this.multiLineDelimiters['racket'] = { start: '#|', end: '|#' };
        this.multiLineDelimiters['lisp'] = { start: '#|', end: '|#' };
        this.multiLineDelimiters['coffeescript'] = { start: '###', end: '###' };
        this.multiLineDelimiters['dockerfile'] = { start: '###', end: '###' };
        this.multiLineDelimiters['elixir'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['terraform'] = { start: '/*', end: '*/' };
        this.multiLineDelimiters['lua'] = { start: '--[[', end: ']]' };

        this.supportedLanguages = Object.keys(this.singleLineDelimiters).concat(Object.keys(this.multiLineDelimiters));
        this.supportedLanguages = [...new Set(this.supportedLanguages)]; //remove duplicates
    }

    public getSupportedLanguages(): string[] {
        return this.supportedLanguages;
    }

    public async removeComments(editor: vscode.TextEditor, languageId: string, removeSingleLine: boolean, removeMultiLine: boolean): Promise<void> {
        const document = editor.document;
        const uri = document.uri;
        const edit = new vscode.WorkspaceEdit();

        if (!this.supportedLanguages.includes(languageId)) {
            return Promise.reject(`Comments removal is not supported for ${languageId}.`);
        }

        if (removeSingleLine) {
            this.removeSingleLineComments(document, edit, uri, languageId);
        }
        if (removeMultiLine) {
            this.removeMultiLineComments(document, edit, uri, languageId);
        }

        await vscode.workspace.applyEdit(edit);
        await editor.document.save();
    }

    private removeSingleLineComments(document: vscode.TextDocument, edit: vscode.WorkspaceEdit, uri: vscode.Uri, languageId: string) {
        const delimiter = this.singleLineDelimiters[languageId];
        if (!delimiter) {
            return; // Language doesn't support single-line comments
        }

        const regEx = new RegExp(`(^|\\s)${delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}(?=(?:[^"'\`]*"[^"'\`]*")*(?:[^"'\`]*'[^"'\`]*')*(?:[^"'\`]*\`[^"'\`]*\`)*[^"'\`]*$)(?!(\\s*#!));`, "igm");

        for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
            const line = document.lineAt(lineIndex);
            const match = regEx.exec(line.text);
            if (match) {
                const startPos = new vscode.Position(lineIndex, match.index);
                const endPos = new vscode.Position(lineIndex, line.text.length);
                const range = new vscode.Range(startPos, endPos);
                edit.delete(uri, range);
            }
        }
    }

    private removeMultiLineComments(document: vscode.TextDocument, edit: vscode.WorkspaceEdit, uri: vscode.Uri, languageId: string) {
        const delimiters = this.multiLineDelimiters[languageId];
        if (!delimiters) {
            return; // Language doesn't support multi-line comments
        }

        const startDelimiter = delimiters.start.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const endDelimiter = delimiters.end.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regEx = new RegExp(`(^|[ \\t])(${startDelimiter})([\\s\\S]*?)(${endDelimiter})`, 'gm');
        const text = document.getText();
        let match;

        while ((match = regEx.exec(text))) {
            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[0].length);
            const range = new vscode.Range(startPos, endPos);
            edit.delete(uri, range);
        }
    }
}


export function activate(context: vscode.ExtensionContext) {
    const parser = new Parser();
    let activeEditor = vscode.window.activeTextEditor;

    const removeCommentsCommand = (removeSingleLine: boolean, removeMultiLine: boolean) => {
        if (!activeEditor) {
            vscode.window.showErrorMessage('No active text editor.');
            return;
        }
        const languageId = activeEditor.document.languageId;
        parser.removeComments(activeEditor, languageId, removeSingleLine, removeMultiLine)
            .then(() => {
                vscode.window.showInformationMessage('Comments removed.');
            })
            .then(undefined, (error: unknown) => {
                vscode.window.showErrorMessage(`Error removing comments: ${error}`);
            });
    };

    const removeAllCommentsCommand = vscode.commands.registerCommand('extension.removeAllComments', () => {
        activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            removeCommentsCommand(true, true);
        }
    });

    const removeSingleLineCommentsCommand = vscode.commands.registerCommand('extension.removeSingleLineComments', () => {
        activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            removeCommentsCommand(true, false);
        }
    });

    const removeMultiLineCommentsCommand = vscode.commands.registerCommand('extension.removeMultiLineComments', () => {
        activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            removeCommentsCommand(false, true);
        }
    });

    context.subscriptions.push(removeAllCommentsCommand);
    context.subscriptions.push(removeSingleLineCommentsCommand);
    context.subscriptions.push(removeMultiLineCommentsCommand);
}

export function deactivate() { }