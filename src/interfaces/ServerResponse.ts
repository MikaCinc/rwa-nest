export interface ServerResponse<T> {
    success: boolean;
    data: T | null;

    // validation pipes placeholder (class-validator)
    statusCode?: number,
    message?: string | string[],
    error?: string
};