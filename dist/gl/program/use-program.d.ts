import { GlController } from "../../control/gl-controller";
import { ProgramConfig, ProgramId } from "./program";
interface Props {
    gl?: WebGL2RenderingContext;
    initialProgram?: ProgramId;
    programs?: ProgramConfig[];
    showDebugInfo?: boolean;
    controller?: GlController;
}
export declare function useProgram({ gl, initialProgram, programs, showDebugInfo, controller }: Props): {
    usedProgram: WebGLProgram | undefined;
};
export {};
