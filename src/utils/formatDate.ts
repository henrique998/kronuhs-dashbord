import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string) {
    const dateFormatted = format(
        parseISO(date),
        "d 'de' LLLL 'de' y",
        { locale: ptBR }
    );

    return dateFormatted
}