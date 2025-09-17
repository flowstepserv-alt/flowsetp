"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Sidebar from "./sidebar";

export const Heading = () => {
    return(
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar - Fixed on the left */}
            <div className="fixed left-0 top-0 h-full z-10">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 ml-72 flex flex-col">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-800">Header</h2>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-8 flex items-center justify-center">
                    <div className="max-w-3xl space-y-4">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                            Your Ideas, Documents & Plans <span
                            className="underline">SOP</span>
                        </h1>
                        <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                            SOP is where u can bee cool <br />
                            boom boom boom
                        </h3>
                        <Button>
                            Enter SOP
                            <ArrowRight className="h-4 w-4 ml-2"/>
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    )
}