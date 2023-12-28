// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	disposable1 = vscode.commands.registerCommand('regex-dev-tools.formatToQuery', function () {
		let editor = vscode.window.activeTextEditor;
		let document = vscode.window.activeTextEditor.document;
		let documentText = vscode.window.activeTextEditor.document.getText();
		let lines = documentText.split('\n');
		vscode.window.activeTextEditor.edit((textEditor) => {
			let allText = new vscode.Range(
				document.positionAt(0),
				document.positionAt(documentText.length)
			)
			textEditor.delete(allText);
			textEditor.insert(editor.selection.active, `(`);
			for (let i = 0; i < lines.length - 1; i++) {
				textEditor.insert(editor.selection.active, `"${lines[i]}" or `);
			}
			textEditor.insert(editor.selection.active, `"${lines[lines.length - 1]}")`);
		});
	});

	disposable2 = vscode.commands.registerCommand('regex-dev-tools.formatToWhereArray', function () {
		let editor = vscode.window.activeTextEditor;
		let document = vscode.window.activeTextEditor.document;
		let documentText = vscode.window.activeTextEditor.document.getText();
		let lines = documentText.split('\n');
		vscode.window.activeTextEditor.edit((textEditor) => {
			let allText = new vscode.Range(
				document.positionAt(0),
				document.positionAt(documentText.length)
			)
			textEditor.delete(allText);
			textEditor.insert(editor.selection.active, `(`);
			for (let i = 0; i < lines.length - 1; i++) {
				textEditor.insert(editor.selection.active, `"${lines[i]}", `);
			}
			textEditor.insert(editor.selection.active, `"${lines[lines.length - 1]}")`);
		});
	});

	disposable3 = vscode.commands.registerCommand('regex-dev-tools.formatToGeneralArray', function () {
		let editor = vscode.window.activeTextEditor;
		let document = vscode.window.activeTextEditor.document;
		let documentText = vscode.window.activeTextEditor.document.getText();
		let lines = documentText.split('\n');
		vscode.window.activeTextEditor.edit((textEditor) => {
			let allText = new vscode.Range(
				document.positionAt(0),
				document.positionAt(documentText.length)
			)
			textEditor.delete(allText);
			textEditor.insert(editor.selection.active, `[`);
			for (let i = 0; i < lines.length - 1; i++) {
				textEditor.insert(editor.selection.active, `"${lines[i]}", `);
			}
			textEditor.insert(editor.selection.active, `"${lines[lines.length - 1]}"]`);
		});
	});

	disposable4 = vscode.commands.registerCommand('regex-dev-tools.removeDuplicates', function () {
		const editor = vscode.window.activeTextEditor;
		const selection = editor.selection;
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
			const highlighted = editor.document.getText(selectionRange);
			let lines = highlighted.split('\n');
			let registeredLines = new Set(lines);
			vscode.window.activeTextEditor.edit((textEditor) => {
				textEditor.delete(selection)
				for (let line of registeredLines) {
					textEditor.insert(selectionRange.start, `${line}\n`);
				}
			});
		}
	});

	disposable5 = vscode.commands.registerCommand('regex-dev-tools.getDifferencesFromSelection', function () {
		const editor = vscode.window.activeTextEditor;
		const selection = editor.selection;
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
			const highlighted = editor.document.getText(selectionRange);
			let blocks = highlighted.split(/(?:\h*\n){2,}/gm);
			let resultantSet = new Set(blocks[0].split('\n'));
			for (let i = 1; i < blocks.length; i++) {
				let lines = blocks[i].split('\n');
				let registeredLines = new Set(lines);
				let differentLines = [];
				for (let line of resultantSet) {
					if (!registeredLines.has(line)) {
						differentLines.push(line);
					}
				}
				resultantSet = new Set(differentLines);
			}
			vscode.window.activeTextEditor.edit((textEditor) => {
				textEditor.insert(selectionRange.end, '\n\n');
				textEditor.insert(editor.selection.active, '|----- Difference between the sets -----|\n\n');
				for (let line of resultantSet) {
					textEditor.insert(editor.selection.active, `${line}\n`);
				}
			});
		}
	});

	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
	context.subscriptions.push(disposable4);
	context.subscriptions.push(disposable5);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
