import { Monitor, Moon, Sun } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Theme, useTheme } from "./theme-provider"
import { useCallback } from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor
}

export function ThemeSwitch() {
    const {setTheme} = useTheme()

    const updateTheme = useCallback((theme: Theme) => {
        setTheme(theme)
        localStorage.setItem("task-manager-theme", theme)
    }, [setTheme])

    return (
        <ToggleGroup variant="outline" type="single" className="border flex w-fit rounded-md px-2">
            {Object.keys(themeIcons).map((theme) => {
                const Icon = themeIcons[theme as keyof typeof themeIcons]
            
                return (
                    <TooltipProvider key={theme}>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <ToggleGroupItem 
                                value={theme} 
                                aria-label={`Enable ${theme} theme`}
                                onClick={() => updateTheme(theme as Theme)}
                                className="bg-transparent border-0 shadow-none"
                            >
                                <Icon className="h-4 w-4" />
                            </ToggleGroupItem>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{theme} theme</p>
                        </TooltipContent>
                        </Tooltip>
                  </TooltipProvider>
                )
            })}
        </ToggleGroup>
    )
}
