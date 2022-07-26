// TODO A DELETE
class ZMQStatsTotal {
	constructor(total_current_hash_rate = 0, total_avg_hash_rate = 0) {
		this.key = 'total_stats';
		this.total_current_hash_rate = total_current_hash_rate;
		this.total_avg_hash_rate = total_avg_hash_rate;
	}

	/*
	 * Update data to have a refresh with new data
	 */
	update() {
		this.total_current_hash_rate += 10000;
		this.total_avg_hash_rate += 10000;
	}
}

module.exports = ZMQStatsTotal;
