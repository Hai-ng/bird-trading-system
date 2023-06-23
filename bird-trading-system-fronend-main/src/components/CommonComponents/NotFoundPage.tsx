import React from "react";
import { ReactNode } from "react";


export class NotFoundPage extends React.Component<{}, {}> {
    render(): ReactNode {
        return (
            <div>
                <span>
                    Could not found this page!
                </span>
            </div>
        )
    }
}