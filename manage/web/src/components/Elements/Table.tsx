import React from 'react';

type Cell = Record<string, string | React.ReactNode>;

type TableProps = {
    titles: string[],
    cells: Cell[],
}

export const Table = ({titles, cells}: TableProps) => {
    return (
        <table className="w-full table-auto">
            <thead>
            <tr>
                {
                    titles.map((title, index) => (
                        <th key={title + index}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</th>
                    ))
                }
            </tr>
            </thead>
            <tbody>
            {
                cells.map((cell, index) => (
                    <tr key={index}>
                        {
                            titles.map((title, index) => (
                                <td key={title + index}
                                    className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{cell[title]}</td>
                            ))
                        }
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}