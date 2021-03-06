/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-tslint-rules
 */
/*tslint:disable:no-use-before-declare*/

import * as Lint from "tslint";
import * as ts from "typescript";
import { tsquery } from "@phenomnomnominal/tsquery";

export class Rule extends Lint.Rules.TypedRule {

    public static metadata: Lint.IRuleMetadata = {
        description: "Disallows using the `shareReplay` operator.",
        options: null,
        optionsDescription: "Not configurable.",
        requiresTypeInfo: true,
        ruleName: "rxjs-no-sharereplay",
        type: "functionality",
        typescriptOnly: true
    };

    public static FAILURE_STRING = "shareReplay is forbidden";

    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {

        const failures: Lint.RuleFailure[] = [];

        const callIdentifiers = tsquery(
            sourceFile,
            `CallExpression Identifier[name="shareReplay"]`
        );
        callIdentifiers.forEach(identifier => {
            failures.push(new Lint.RuleFailure(
                sourceFile,
                identifier.getStart(),
                identifier.getStart() + identifier.getWidth(),
                Rule.FAILURE_STRING,
                this.ruleName
            ));
        });
        return failures;
    }
}
