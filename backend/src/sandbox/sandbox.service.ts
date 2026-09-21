import { Injectable } from '@nestjs/common';
import vm from 'vm';

@Injectable()
export class SandboxService {
  async runCode(language: string, code: string) {
    if (language !== 'javascript') {
      return { output: '', stderr: 'Only JavaScript is supported in this sandbox right now.' };
    }

    const logs: string[] = [];
    const sandbox = {
      console: {
        log: (...args: unknown[]) => logs.push(args.map(String).join(' ')),
      },
    };

    try {
      vm.createContext(sandbox);
      vm.runInContext(code, sandbox, { timeout: 3000 });
      return { output: logs.join('\n'), stderr: '' };
    } catch (err) {
      return { output: '', stderr: err instanceof Error ? err.message : String(err) };
    }
  }
}