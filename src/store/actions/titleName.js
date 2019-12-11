export const TITLE_NAME = "TITLE_NAME";

export function name(name) {
    return {
        type: TITLE_NAME,
        data: name
    };
}

