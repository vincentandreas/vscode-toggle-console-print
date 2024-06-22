import { CommentPtn } from "../type/type";

function createCommentPtn(commentSymbol : string, logSyntax : string) : CommentPtn{
    return {
        without_comment: new RegExp(`^( *)((${logSyntax}).*)$`),
        with_comment: new RegExp(`^( *)(${commentSymbol} *)((${logSyntax}).*)$`)
    };
}

const slash = `\\/\\/`;
const htag = `\\#`;

const js = createCommentPtn(slash,'console\\.log')
const java = createCommentPtn(slash,'System\\.out\\.print');
const go = createCommentPtn(slash, 'fmt\\.Print|fmt\\.Sprint');
const cpp = createCommentPtn(slash,'cout[ ]*<<');
const py = createCommentPtn(htag, 'print[ ]*\\(')
const bash = createCommentPtn(htag, 'echo[ ]+')

export const PATTERN: Record<string, CommentPtn> = {
    javascript: js,
    typescript: js,
    java: java,
    go:go,
    cpp:cpp,
    shellscript:bash,
    python:py,
};

