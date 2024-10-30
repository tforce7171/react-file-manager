import * as React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ReactFileManager } from ".";
export const dummyFileSystem = [
    { id: "0", name: "/", path: "/", isRoot: true, isDir: true },
    {
        id: "31258",
        name: "report.pdf",
        isDir: false,
        parentId: "0",
    },
    {
        id: "31259",
        name: "Documents",
        isDir: true,
        parentId: "0",
        path: "/Documents",
    },
];
describe("it", () => {
    it("renders without crashing", async () => {
        const result = render(React.createElement(ReactFileManager, { fs: dummyFileSystem }));
        const workspace = result.container.querySelector("#react-file-manager-workspace");
        expect(workspace).not.toBeNull();
    });
});
