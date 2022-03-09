import { BaseEntry, BaseGuildCache, ResponseBuilder } from ".."
import { InteractionReplyOptions, MessagePayload, SelectMenuInteraction } from "discord.js"

export default class SelectMenuHelper<E extends BaseEntry, GC extends BaseGuildCache<E, GC>> {
	public constructor(
		public readonly cache: GC,
		public readonly interaction: SelectMenuInteraction
	) {}

	public respond(options: MessagePayload | InteractionReplyOptions | ResponseBuilder) {
		if (options instanceof ResponseBuilder) {
			this.interaction
				.followUp({ embeds: [options.build()] })
				.catch(err => logger.warn("Failed to follow up select menu interaction", err))
		} else {
			this.interaction
				.followUp(options)
				.catch(err => logger.warn("Failed to follow up select menu interaction", err))
		}
	}

	public update(options: MessagePayload | InteractionReplyOptions | ResponseBuilder) {
		if (options instanceof ResponseBuilder) {
			this.interaction
				.update({ embeds: [options.build()] })
				.catch(err => logger.warn("Failed to update select menu interaction", err))
		} else {
			this.interaction
				.update(options)
				.catch(err => logger.warn("Failed to update select menu interaction", err))
		}
	}

	public value(): string | undefined {
		return this.interaction.values[0]
	}
}
