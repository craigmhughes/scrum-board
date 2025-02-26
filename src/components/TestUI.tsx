import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export default function TestUI() {
    const {theme, setTheme} = useTheme();

    return (
        <>
            <h1>{theme}</h1>
            <div>
                <Button onClick={() => setTheme("dark")}>
                    Dark
                </Button>
                <Button onClick={() => setTheme("light")}>
                    Light
                </Button>
                <Button onClick={() => setTheme("system")}>
                    System
                </Button>
            </div>
        </>
    )
}