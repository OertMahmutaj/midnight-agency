'use client';

import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { useRouter } from 'next/navigation';

type Command = {
    value: string;
    label: string;
    description: string;
    href?: string;
    action?: 'contact';
};

type CrtCommandInputProps = {
    variant?: 'screen' | 'mobile';
};

const commands: Command[] = [
    // {
    //     value: 'home',
    //     label: 'Home',
    //     description: 'Return to homepage',
    //     href: '/',
    // },
    {
        value: 'work',
        label: 'Work',
        description: 'View selected projects',
        href: '/work',
    },
    {
        value: 'services',
        label: 'Services',
        description: 'Explore our services',
        href: '/services',
    },
    {
        value: 'people',
        label: 'People',
        description: 'Meet the studio',
        href: '/people',
    },
    {
        value: 'contact',
        label: 'Contact',
        description: 'Open contact menu',
        action: 'contact',
    },
];

export default function CrtCommandInput({
    variant = 'screen',
}: CrtCommandInputProps) {
    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

    /*
     * Prevents Ctrl+L, Ctrl+C and similar shortcuts
     * from activating the terminal.
     */
    const ctrlWasUsedWithAnotherKey = useRef(false);

    const commandPointerStartRef = useRef<{
        x: number;
        y: number;
    } | null>(null);

    const suppressCommandClickRef = useRef(false);

    const [value, setValue] = useState('');
    const [focused, setFocused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [message, setMessage] = useState('');

    const isScreen = variant === 'screen';

    const normalizedValue = value.trim().toLowerCase();

    const filteredCommands = useMemo(() => {
        if (!normalizedValue) {
            return commands;
        }

        return commands.filter((command) => {
            const commandValue = command.value.toLowerCase();
            const commandLabel = command.label.toLowerCase();

            return (
                commandValue.startsWith(normalizedValue) ||
                commandLabel.includes(normalizedValue)
            );
        });
    }, [normalizedValue]);

    const safeActiveIndex = Math.min(
        activeIndex,
        Math.max(filteredCommands.length - 1, 0),
    );

    const activeCommand =
        filteredCommands[safeActiveIndex] ??
        filteredCommands[0];

    const completion =
        focused &&
            normalizedValue &&
            activeCommand?.value.startsWith(normalizedValue)
            ? activeCommand.value.slice(normalizedValue.length)
            : '';

    /*
     * Activate the desktop CRT terminal by pressing
     * and releasing Ctrl by itself.
     */
    useEffect(() => {
        if (!isScreen) return;

        function handleWindowKeyDown(event: globalThis.KeyboardEvent) {
            if (event.key === 'Control') {
                ctrlWasUsedWithAnotherKey.current = false;
                return;
            }

            if (event.ctrlKey) {
                ctrlWasUsedWithAnotherKey.current = true;
            }
        }

        function handleWindowKeyUp(event: globalThis.KeyboardEvent) {
            if (event.key !== 'Control') return;

            if (ctrlWasUsedWithAnotherKey.current) {
                ctrlWasUsedWithAnotherKey.current = false;
                return;
            }

            inputRef.current?.focus({
                preventScroll: true,
            });
        }

        window.addEventListener('keydown', handleWindowKeyDown);
        window.addEventListener('keyup', handleWindowKeyUp);

        return () => {
            window.removeEventListener(
                'keydown',
                handleWindowKeyDown,
            );

            window.removeEventListener(
                'keyup',
                handleWindowKeyUp,
            );
        };
    }, [isScreen]);

    function focusTerminal() {
        inputRef.current?.focus({
            preventScroll: true,
        });
    }

    function executeCommand(command?: Command) {
        const exactCommand = commands.find(
            (item) => item.value === normalizedValue,
        );

        const selectedCommand =
            command ?? exactCommand ?? activeCommand;

        /*
         * Pressing Enter without typing should not
         * automatically select Home.
         */
        if (!normalizedValue && !command) {
            return;
        }

        if (!selectedCommand) {
            setMessage('UNKNOWN COMMAND');
            return;
        }

        setValue(selectedCommand.value);
        setActiveIndex(0);
        setMessage(
            `OPENING ${selectedCommand.label}...`,
        );

        if (selectedCommand.action === 'contact') {
            setMessage('Opening contact form...');

            window.dispatchEvent(
                new CustomEvent('midnight:open-contact'),
            );

            window.setTimeout(() => {
                setMessage('');
                setValue('');
                inputRef.current?.blur();
            }, 400);

            return;
        }

        if (selectedCommand.href) {
            const href = selectedCommand.href;

            window.setTimeout(() => {
                router.push(href);
            }, 160);
        }
    }

    function handleKeyDown(
        event: ReactKeyboardEvent<HTMLInputElement>,
    ) {
        if (event.key === 'ArrowDown') {
            event.preventDefault();

            setActiveIndex((current) => {
                if (!filteredCommands.length) return 0;

                return (current + 1) % filteredCommands.length;
            });

            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();

            setActiveIndex((current) => {
                if (!filteredCommands.length) return 0;

                return (
                    (current - 1 + filteredCommands.length) %
                    filteredCommands.length
                );
            });

            return;
        }

        if (event.key === 'Tab') {
            if (!activeCommand) return;

            event.preventDefault();
            setValue(activeCommand.value);
            setActiveIndex(0);

            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();

            if (activeCommand) {
                executeCommand(activeCommand);
            }

            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();

            setMessage('');
            setValue('');
            setActiveIndex(0);
            inputRef.current?.blur();
        }
    }

    function handleInputBlur() {
        setFocused(false);
        setValue('');
        setMessage('');
        setActiveIndex(0);
    }

    const placeholder = isScreen
        ? 'PRESS CTRL TO TYPE'
        : 'TAP TO TYPE';

    return (
        <div
            role="application"
            aria-label="Midnight navigation terminal"
            className={
                isScreen
                    ? 'relative h-full w-full'
                    : 'relative w-full max-w-xl'
            }
        >
            {/* INPUT PANEL — lower-left side of the CRT */}
            <div
                onPointerDown={(event) => {
                    if (event.button !== 0) return;

                    event.preventDefault();
                    focusTerminal();
                }}
                className={
                    isScreen
                        ? `
      absolute
      bottom-[8%]
      left-[7%]
      top-[56%]
      w-[41%]
      cursor-text
      overflow-hidden
      px-[5%]
      py-[6%]
      font-mono
      text-[clamp(0.34rem,0.42vw,0.56rem)]
      tracking-[0.08em]
      text-[#65c9c4]
      [text-shadow:0_0_5px_rgba(101,201,196,0.55)]
    `
                        : `
    relative
    cursor-text
    overflow-hidden
    touch-pan-y
    px-4
    py-4
    font-mono
    text-sm
    tracking-[0.08em]
    text-[#65c9c4]
    [text-shadow:0_0_6px_rgba(101,201,196,0.5)]
  `
                }
            >
                <div className="relative flex min-h-[1.25em] items-start">
                    <span className="mr-[0.55em] shrink-0 text-[#d27658]/75">
                        &gt;
                    </span>

                    <div className="relative min-w-0 flex-1 overflow-hidden">
                        {/* Visible terminal content */}
                        <div
                            aria-hidden="true"
                            className="
                pointer-events-none
                flex
                min-h-[1.25em]
                min-w-0
                items-center
                whitespace-pre
              "
                        >
                            {!focused ? (
                                <>
                                    <span className="truncate text-[#65c9c4]/60">
                                        {placeholder}
                                    </span>

                                    <span
                                        className="
                      ml-[0.4em]
                      inline-block
                      h-[0.9em]
                      w-[0.45em]
                      shrink-0
                      bg-[#6bd2cc]
                      align-middle
                      opacity-80
                      shadow-[0_0_6px_rgba(107,210,204,0.7)]
                      [animation:crt-cursor_1s_steps(1,end)_infinite]
                    "
                                    />
                                </>
                            ) : (
                                <>
                                    <span>{value}</span>

                                    <span
                                        className="
                      mx-[0.12em]
                      inline-block
                      h-[0.9em]
                      w-[0.45em]
                      shrink-0
                      bg-[#6bd2cc]
                      align-middle
                      shadow-[0_0_6px_rgba(107,210,204,0.72)]
                      [animation:crt-cursor_1s_steps(1,end)_infinite]
                    "
                                    />

                                    {completion ? (
                                        <span className="text-[#65c9c4]/25">
                                            {completion}
                                        </span>
                                    ) : null}
                                </>
                            )}
                        </div>

                        {/* Invisible real input */}
                        <input
                            ref={inputRef}
                            value={value}
                            onChange={(event) => {
                                setValue(event.target.value);
                                setActiveIndex(0);
                                setMessage('');
                            }}
                            onKeyDown={handleKeyDown}
                            onFocus={() => {
                                setFocused(true);
                                setActiveIndex(0);
                            }}
                            onBlur={handleInputBlur}
                            autoComplete="off"
                            autoCapitalize="none"
                            spellCheck={false}
                            aria-label="Type a Midnight navigation command"
                            className="
                absolute
                inset-0
                h-full
                w-full
                cursor-text
                border-0
                bg-transparent
                p-0
                text-transparent
                caret-transparent
                outline-none
                selection:bg-transparent
              "
                        />
                    </div>
                </div>

                {focused ? (
                    <p
                        className="
              mt-[0.7em]
              border-t
              border-[#65c9c4]/10
              pt-[0.55em]
              text-[0.72em]
              tracking-[0.06em]
              text-[#65c9c4]/35
            "
                    >
                        TAB COMPLETE · ENTER OPEN
                    </p>
                ) : null}

                {message ? (
                    <p
                        className="
              mt-[0.7em]
              truncate
              text-[0.78em]
              text-[#d27658]
            "
                    >
                        {message}
                    </p>
                ) : null}
            </div>

            {/* MENU PANEL — lower-right side of the CRT */}
            <div
                className={
                    isScreen
                        ? `
      absolute
      bottom-[8%]
      right-[7%]
      top-[56%]
      w-[41%]
      overflow-y-auto
      p-[3%]
      font-mono
      text-[clamp(0.32rem,0.39vw,0.52rem)]
      tracking-[0.08em]
      text-[#65c9c4]
      transition-opacity
      duration-200
      [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden
      ${focused ? 'opacity-100' : 'opacity-45'}
    `
                        : `
    relative
    mt-3
    max-h-52
    overflow-y-auto
    touch-pan-y
    p-2
    font-mono
    text-xs
    tracking-[0.08em]
    text-[#65c9c4]
    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden
  `
                }
            >
                {filteredCommands.length ? (
                    filteredCommands.map((command, index) => {
                        const active =
                            focused && index === safeActiveIndex;

                        return (
                            <button
                                key={command.value}
                                type="button"
                                tabIndex={-1}
                                onPointerEnter={() => {
                                    if (focused) {
                                        setActiveIndex(index);
                                    }
                                }}
                                onPointerDown={(event) => {
                                    commandPointerStartRef.current = {
                                        x: event.clientX,
                                        y: event.clientY,
                                    };

                                    suppressCommandClickRef.current = false;
                                }}

                                onPointerMove={(event) => {
                                    const start = commandPointerStartRef.current;

                                    if (!start) return;

                                    const distance = Math.hypot(
                                        event.clientX - start.x,
                                        event.clientY - start.y,
                                    );

                                    if (distance > 12) {
                                        suppressCommandClickRef.current = true;
                                    }
                                }}

                                onPointerUp={() => {
                                    commandPointerStartRef.current = null;
                                }}

                                onPointerCancel={() => {
                                    commandPointerStartRef.current = null;
                                    suppressCommandClickRef.current = true;
                                }}

                                onClick={(event) => {
                                    if (suppressCommandClickRef.current) {
                                        event.preventDefault();
                                        suppressCommandClickRef.current = false;
                                        return;
                                    }

                                    executeCommand(command);
                                }}
                                className={`
                  flex
                  w-full
                  items-center
                  gap-[0.55em]
                  px-[0.45em]
                  py-[0.34em]
                  text-left
                  transition-colors
                  duration-150
                  ${active
                                        ? 'text-[#8ce1dc] [text-shadow:0_0_6px_rgba(101,201,196,0.7)]'
                                        : 'text-[#65c9c4]/58'
                                    }
                `}
                            >
                                <span
                                    className={
                                        active
                                            ? 'text-[#d27658]'
                                            : 'text-[#d27658]/55'
                                    }
                                >
                                    &gt;
                                </span>

                                <span className="truncate">
                                    {command.value}
                                </span>
                            </button>
                        );
                    })
                ) : (
                    <div className="px-[0.45em] py-[0.4em] text-[#d27658]">
                        NO MATCH
                    </div>
                )}
            </div>
        </div>
    );
}