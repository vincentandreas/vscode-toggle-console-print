import { CommentPtn } from "../type/type";

const js: CommentPtn = {
    without_comment: /([ ]*)((console\.).*$)/,
    with_comment: /([ ]*)(\/\/[ ]*)((console\.).*$)/
};

const java: CommentPtn = {
    without_comment: /([ ]*)((System\.out\.print).*$)/,
    with_comment: /([ ]*)(\/\/[ ]*)((System\.out\.print).*$)/
};

const go: CommentPtn = {
    without_comment:/([ ]*)((fmt\.Print|fmt\.Sprint).*$)/,
    with_comment:/([ ]*)(\/\/[ ]*)((fmt\.Print|fmt\.Sprint).*$)/,
};

//fmt.Sprintf

export const PATTERN: Record<string, CommentPtn> = {
    javascript: js,
    typescript: js,
    java: java,
    go:go,
};

