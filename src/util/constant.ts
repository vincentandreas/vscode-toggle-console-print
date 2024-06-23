import { CommentPtn } from "../type/type";

function createCommentPtn(commentSymbol : string, logSyntax : string) : CommentPtn{
    return {
        without_comment: new RegExp(`^([\\s]*)((${logSyntax}).*)$`),
        with_comment: new RegExp(`^([\\s]*)(${commentSymbol}[\\s]*)((${logSyntax}).*)$`)
    };
}

const slash = `\\/\\/`;
const htag = `\\#`;

const js = createCommentPtn(slash,'console\\.log')
const java = createCommentPtn(slash,'System\\.out\\.print');
const go = createCommentPtn(slash, 'fmt\\.Print|fmt\\.Sprint');
const cpp = createCommentPtn(slash,'cout[\\s]*<<');
const py = createCommentPtn(htag, 'print[\\s]*\\(')
const bash = createCommentPtn(htag, 'echo[\\s]+')

export const PATTERN: Record<string, CommentPtn> = {
    javascript: js,
    typescript: js,
    typescriptreact:js,
    javascriptreact:js,
    java: java,
    go:go,
    cpp:cpp,
    shellscript:bash,
    python:py,
};

